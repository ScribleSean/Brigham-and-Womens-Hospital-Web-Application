import {
  EditorMode,
  NodeDisplayProps,
  OldNewNode,
} from "common/src/types/map_page_types.ts";
import React, { CSSProperties, useEffect, useState } from "react";
import {
  BuildingType,
  FloorType,
  Node,
  NodeType,
  Path,
} from "common/src/DataStructures.ts";
import Draggable from "react-draggable";
import { useMapContext } from "./MapContext.ts";
import "../styles/DisplayNode.css";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import ElevatorIcon from "@mui/icons-material/Elevator";
import StairsIcon from "@mui/icons-material/Stairs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default NodeDisplay;

function imageToDisplayCoordinates(
  x: number,
  scalingX: number,
  y: number,
  scalingY: number,
): { displayX: number; displayY: number } {
  return {
    displayX: x * scalingX,
    displayY: y * scalingY,
  };
}

function sameNode(node1: Node | null, node2: Node | null) {
  if (node1 && node2) {
    return node1.ID == node2.ID;
  } else {
    return false;
  }
}

function startBorderNode(node: Node, path: Path) {
  return path.edges[0].startNode.ID === node.ID;
}

function endBorderNode(node: Node, path: Path) {
  const len: number = path.edges.length;
  if (len === 1) return false;
  return path.edges[len - 2].endNode.ID === node.ID;
}

export function NodeDisplay(props: NodeDisplayProps): React.JSX.Element {
  const [dragged, setDragged] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const widthScaling = props.scaling.widthScaling;
  const heightScaling = props.scaling.heightScaling;
  const node = props.node;
  const {
    startNode,
    endNode,
    setStartNode,
    setEndNode,
    editorMode,
    setDisableZoomPanning,
    scale,
    paths,
    directionsCounter,
    setDirectionsCounter,
    nodesToBeDeleted,
    setNodesToBeDeleted,
    nodesToBeEdited,
    setNodesToBeEdited,
    showNodes,
    setUnsavedChanges,
    graph,
    setGraph,
  } = useMapContext();

  const [triggerRed, setTriggerRed] = useState<boolean>(false);

  const [editedNode, setEditedNode] = useState<Node>(
    new Node(
      node.ID,
      node.x,
      node.y,
      node.floor,
      node.building,
      node.type,
      node.longName,
      node.shortName,
    ),
  );
  const [tempNode, setTempNode] = useState<Node>(
    new Node(
      node.ID,
      node.x,
      node.y,
      node.floor,
      node.building,
      node.type,
      node.longName,
      node.shortName,
    ),
  );

  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    if (startNode) {
      // Schedule the red animation to start after 2 seconds (the duration of one green animation cycle)
      setTimeout(() => {
        setTriggerRed(true);
      }, 2000); // Duration of the green pulse
    }
  }, [startNode]);

  function nodeInPathChangingFloorStart(node: Node, paths: Array<Path>) {
    if (paths && paths.length > 0) {
      return paths.some((path) => {
        return path.edges.some((edge) => {
          return (
            startBorderNode(node, path) &&
            (edge.startNode.ID === node.ID || edge.endNode.ID === node.ID) &&
            (node.type === "ELEV" || node.type === "STAI") &&
            paths[directionsCounter].edges[0].startNode.ID === node.ID
          );
        });
      });
    }
    return false;
  }

  function nodeInPathChangingFloorEnd(node: Node, paths: Array<Path>) {
    if (paths && paths.length > 0) {
      return paths.some((path) => {
        return path.edges.some((edge) => {
          return (
            endBorderNode(node, path) &&
            (edge.startNode.ID === node.ID || edge.endNode.ID === node.ID) &&
            (node.type === "ELEV" || node.type === "STAI") &&
            paths[directionsCounter].edges[
              paths[directionsCounter].edges.length - 2
            ].endNode.ID === node.ID
          );
        });
      });
    }
    return false;
  }

  const handleNodeSelection = (node: Node): void => {
    if (!dragged) {
      if (editorMode !== EditorMode.disabled) {
        setShowModal(true);
        setTempNode(makeNode(editedNode));
        return;
      }
      if (!startNode) {
        setStartNode(node);
        //console.log("Start node: " + node + ", End node: " + null);
      } else if (!endNode) {
        setEndNode(node);
        //console.log("Start node: " + startNode + ", End node: " + node);
      } else {
        setStartNode(node);
        setEndNode(null);
        //console.log("Start node: " + node + ", End node: " + null);
      }
    } else {
      handleStopDrag();
    }
  };

  const { displayX, displayY } = imageToDisplayCoordinates(
    node.x,
    widthScaling,
    node.y,
    heightScaling,
  );

  const changingFloorNodeStyle: CSSProperties = {
    position: "absolute",
    left: `${displayX}px`,
    top: `${displayY}px`,
    zIndex: 3,
  };

  const normalNodeStyle: CSSProperties = {
    position: "absolute",
    left: `${displayX}px`,
    top: `${displayY}px`,
    zIndex: 3,
    borderRadius: "100%",
    padding: "0",
    borderColor: "black",
    backgroundColor: "white",
  };

  const startNodeStyle: CSSProperties = {
    position: "absolute",
    left: `${displayX}px`,
    top: `${displayY}px`,
    zIndex: 3,
    borderRadius: "100%",
    padding: "0",
    borderColor: "black",
    color: "darkgreen",
    //backgroundColor: "green",
  };

  const endNodeStyle: CSSProperties = {
    position: "absolute",
    left: `${displayX}px`,
    top: `${displayY}px`,
    zIndex: 3,
    borderRadius: "100%",
    padding: "0",
    borderColor: "black",
    color: "darkred",
    //backgroundColor: "red",
  };

  const hidden: CSSProperties = {
    opacity: 0,
  };

  const handleStartDrag = () => {
    setDragged(true);
    setDisableZoomPanning(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleStopDrag = () => {
    setDragged(false);
    setDisableZoomPanning(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    // Update node's x and y coordinates when dragging stops
    const { x, y } = mousePosition;
    setEditedNode((prev) => {
      if (!prev) {
        return node;
      }

      return new Node(
        prev.ID,
        x,
        y,
        prev.floor,
        prev.building,
        prev.type,
        prev.longName,
        prev.shortName,
      );
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    // Update mouse position state
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleChangingFloorBackNodeClick = () => {
    setDirectionsCounter(directionsCounter - 1);
  };

  const handleChangingFloorNextNodeClick = () => {
    setDirectionsCounter(directionsCounter + 1);
  };

  const handleDeleteNode = (deletedNode: Node): void => {
    if (graph) {
      setGraph(graph.removeNode(node.ID));
      setNodesToBeDeleted([...nodesToBeDeleted, deletedNode]);
      setUnsavedChanges(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedNode((prev) => {
      if (!prev) {
        return node;
      }

      return new Node(
        prev.ID,
        name === "x" ? Number(value) : prev.x,
        name === "y" ? Number(value) : prev.y,
        name === "floor" ? (value as FloorType) : prev.floor,
        name === "building" ? (value as BuildingType) : prev.building,
        name === "type" ? (value as NodeType) : prev.type,
        name === "longName" ? value : prev.longName,
        name === "shortName" ? value : prev.shortName,
      );
    });
  };

  function makeNode(node: Node) {
    return new Node(
      node.ID,
      node.x,
      node.y,
      node.floor,
      node.building,
      node.type,
      node.longName,
      node.shortName,
    );
  }

  // oldNode is simply the node that we passed to DisplayNode
  // newNode is the edited node that we created
  useEffect(() => {
    if (isSaved) {
      const newNode: Node = makeNode(editedNode);
      const newOldNewNode: OldNewNode = {
        oldNode: node,
        newNode: newNode,
      };

      if (graph) {
        setGraph(graph.editNode(node));
        setNodesToBeEdited([...nodesToBeEdited, newOldNewNode]);
        setUnsavedChanges(true);
      }
      setIsSaved(false);
    }
  }, [
    graph,
    setGraph,
    node,
    nodesToBeEdited,
    setNodesToBeEdited,
    editedNode,
    isSaved,
    tempNode,
    setUnsavedChanges,
  ]);

  const handleSave = () => {
    setIsSaved(true);
    setShowModal(false);
    setTempNode(makeNode(editedNode));
  };

  const handleClose = () => {
    setShowModal(false);
    setEditedNode(tempNode);
  };

  if (editorMode === EditorMode.deleteNodes) {
    return (
      <button
        className="none"
        style={normalNodeStyle}
        onClick={() => handleDeleteNode(node)}
      />
    );
  }

  return editorMode === EditorMode.disabled ? (
    <>
      {(node.type === NodeType.ELEV || node.type === NodeType.STAI) && (
        <>
          {nodeInPathChangingFloorStart(node, paths) && (
            <React.Fragment>
              {node.type === NodeType.ELEV ? (
                <div style={changingFloorNodeStyle}>
                  <ElevatorIcon
                    onClick={handleChangingFloorBackNodeClick}
                    sx={{
                      cursor: "pointer",
                    }}
                  />
                  <Typography
                    variant="button"
                    onClick={handleChangingFloorBackNodeClick}
                    sx={{
                      color: "#012D5A",
                      fontWeight: "bold",
                      fontFamily: "inter",
                      transition: "font-size 0.3s ease",
                      ":hover": {
                        backgroundColor: "white",
                        fontSize: "1rem",
                        cursor: "pointer",
                      },
                    }}
                  >
                    Elevator Back to Floor {""}
                    {directionsCounter - 1 >= 0
                      ? paths[directionsCounter - 1].edges[
                          paths[directionsCounter - 1].edges.length - 1
                        ].startNode.floor
                      : ""}
                  </Typography>
                </div>
              ) : (
                <div style={changingFloorNodeStyle}>
                  <StairsIcon
                    onClick={handleChangingFloorBackNodeClick}
                    sx={{
                      cursor: "pointer",
                    }}
                  />
                  <Typography
                    variant="button"
                    onClick={handleChangingFloorBackNodeClick}
                    sx={{
                      color: "#012D5A",
                      fontWeight: "bold",
                      fontFamily: "inter",
                      transition: "font-size 0.3s ease",
                      ":hover": {
                        backgroundColor: "white",
                        fontSize: "1rem",
                        cursor: "pointer",
                      },
                    }}
                  >
                    Stairs Back to Floor {""}
                    {directionsCounter - 1 >= 0
                      ? paths[directionsCounter - 1].edges[
                          paths[directionsCounter - 1].edges.length - 1
                        ].startNode.floor
                      : ""}
                  </Typography>
                </div>
              )}
            </React.Fragment>
          )}
          {nodeInPathChangingFloorEnd(node, paths) && (
            <React.Fragment>
              {node.type === NodeType.ELEV ? (
                <div style={changingFloorNodeStyle}>
                  <ElevatorIcon
                    onClick={handleChangingFloorNextNodeClick}
                    sx={{
                      cursor: "pointer",
                    }}
                  />
                  <Typography
                    variant="button"
                    onClick={handleChangingFloorNextNodeClick}
                    sx={{
                      color: "#012D5A",
                      fontWeight: "bold",
                      fontFamily: "inter",
                      transition: "font-size 0.3s ease",
                      ":hover": {
                        backgroundColor: "white",
                        fontSize: "1rem",
                        cursor: "pointer",
                      },
                    }}
                  >
                    Elevator to Floor {""}
                    {paths.length > directionsCounter + 1
                      ? paths[directionsCounter + 1].edges[0].startNode.floor
                      : ""}
                  </Typography>
                </div>
              ) : (
                <div style={changingFloorNodeStyle}>
                  <StairsIcon
                    onClick={handleChangingFloorNextNodeClick}
                    sx={{
                      cursor: "pointer",
                    }}
                  />
                  <Typography
                    variant="button"
                    onClick={handleChangingFloorNextNodeClick}
                    sx={{
                      color: "#012D5A",
                      fontWeight: "bold",
                      fontFamily: "inter",
                      transition: "font-size 0.3s ease",
                      ":hover": {
                        backgroundColor: "white",
                        fontSize: "1rem",
                        cursor: "pointer",
                      },
                    }}
                  >
                    Stairs to Floor {""}
                    {paths.length > directionsCounter + 1
                      ? paths[directionsCounter + 1].edges[0].startNode.floor
                      : ""}
                  </Typography>
                </div>
              )}
            </React.Fragment>
          )}
          {!nodeInPathChangingFloorStart(node, paths) &&
            !nodeInPathChangingFloorEnd(node, paths) && (
              <button style={hidden} />
            )}
        </>
      )}
      {node.type !== NodeType.ELEV && node.type !== NodeType.STAI && (
        <>
          {sameNode(startNode, node) ? (
            <PlaceIcon
              className="pulseGreen"
              style={startNodeStyle}
              onClick={() => handleNodeSelection(node)}
            />
          ) : sameNode(endNode, node) ? (
            <GpsFixedIcon
              className={triggerRed ? "pulseRed" : "none"}
              style={endNodeStyle}
              onClick={() => handleNodeSelection(node)}
            />
          ) : !startNode || !endNode ? (
            <Draggable
              scale={scale}
              onDrag={handleStartDrag}
              disabled={editorMode === EditorMode.disabled}
            >
              <button
                className="none"
                style={normalNodeStyle}
                onClick={() => handleNodeSelection(node)}
              />
            </Draggable>
          ) : null}
        </>
      )}
    </>
  ) : (
    <div>
      {showNodes ? (
        <div>
          <Dialog open={showModal} onClose={handleClose}>
            <DialogTitle>Node Information</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="ID"
                type="text"
                fullWidth
                name="ID"
                value={node.ID}
              />
              <TextField
                margin="dense"
                label="X-Coordinate"
                type="text"
                fullWidth
                name="x"
                value={editedNode.x}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Y-Coordinate"
                type="text"
                fullWidth
                name="y"
                value={editedNode.y}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Floor"
                type="text"
                fullWidth
                name="floor"
                value={editedNode.floor}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Building"
                type="text"
                fullWidth
                name="building"
                value={editedNode.building}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Type"
                type="text"
                fullWidth
                name="type"
                value={editedNode.type}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Long Name"
                type="text"
                fullWidth
                name="longName"
                value={editedNode.longName}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Short Name"
                type="text"
                fullWidth
                name="shortName"
                value={editedNode.shortName}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSave}>Save</Button>
              <DeleteForeverIcon
                onClick={() => handleDeleteNode(node)}
                sx={{
                  position: "absolute",
                  left: 0,
                  fontSize: "2rem",
                  ":hover": { cursor: "pointer" },
                }}
              />
            </DialogActions>
          </Dialog>
          <Draggable scale={scale} onDrag={handleStartDrag}>
            <button
              className="node-selector"
              style={normalNodeStyle}
              onClick={() => handleNodeSelection(node)}
            />
          </Draggable>
        </div>
      ) : (
        <div>
          {node.type !== NodeType.ELEV &&
          node.type !== NodeType.STAI &&
          node.type !== NodeType.HALL ? (
            <div>
              <Dialog open={showModal} onClose={handleClose}>
                <DialogTitle>Node Information</DialogTitle>
                <DialogContent>
                  <TextField
                    margin="dense"
                    label="ID"
                    type="text"
                    fullWidth
                    name="ID"
                    value={node.ID}
                  />
                  <TextField
                    margin="dense"
                    label="X-Coordinate"
                    type="text"
                    fullWidth
                    name="x"
                    value={editedNode.x}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    label="Y-Coordinate"
                    type="text"
                    fullWidth
                    name="y"
                    value={editedNode.y}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    label="Floor"
                    type="text"
                    fullWidth
                    name="floor"
                    value={editedNode.floor}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    label="Building"
                    type="text"
                    fullWidth
                    name="building"
                    value={editedNode.building}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    label="Type"
                    type="text"
                    fullWidth
                    name="type"
                    value={editedNode.type}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    label="Long Name"
                    type="text"
                    fullWidth
                    name="longName"
                    value={editedNode.longName}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    label="Short Name"
                    type="text"
                    fullWidth
                    name="shortName"
                    value={editedNode.shortName}
                    onChange={handleChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleSave}>Save</Button>
                  <DeleteForeverIcon
                    onClick={() => handleDeleteNode(node)}
                    sx={{
                      position: "absolute",
                      left: 0,
                      fontSize: "2rem",
                      ":hover": { cursor: "pointer" },
                    }}
                  />
                </DialogActions>
              </Dialog>
              <Draggable scale={scale} onDrag={handleStartDrag}>
                <button
                  className="node-selector"
                  style={normalNodeStyle}
                  onClick={() => handleNodeSelection(node)}
                />
              </Draggable>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
