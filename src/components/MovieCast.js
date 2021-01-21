import React from "react";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@material-ui/core";
import PropTypes from "prop-types";
import CustomTextField from "../components/CustomTextField";
import { Add, Delete, Edit } from "@material-ui/icons";

/**
 * For presenting and changing movie cast information
 * @param {props} props
 */
function MovieCast(props) {
    const [newActorName, setNewActorName] = React.useState("");
    const [newActorCharacter, setNewActorCharacter] = React.useState("");

    // on click on add cast member
    const onAddCastMember = () => {
        if (newActorName === "") {
            return;
        }
        let newActor = { name: newActorName };
        if (newActorCharacter !== "") {
            newActor.characters = [newActorCharacter];
        }
        props.onAddCastMember(newActor);
        setNewActorName("");
        setNewActorCharacter("");
    };

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {/* showing the already added cast members  */}
                    {props.movieCast && props.movieCast !== 0
                        ? props.movieCast.map((actor, index) => (
                              <TableRow key={index}>
                                  <TableCell>
                                      <CustomTextField
                                          value={actor.name}
                                          isEmptyText="Actor"
                                      />
                                  </TableCell>
                                  {actor.characters &&
                                  Array.isArray(actor.characters) ? (
                                      <React.Fragment>
                                          <TableCell>as</TableCell>
                                          <TableCell>
                                              <CustomTextField
                                                  value={actor.characters[0]}
                                                  isEmptyText="a Role"
                                              />
                                          </TableCell>
                                      </React.Fragment>
                                  ) : (
                                      <React.Fragment>
                                          <TableCell></TableCell>
                                          <TableCell></TableCell>
                                      </React.Fragment>
                                  )}
                                  {props.isAdmin ? (
                                      <TableCell>
                                          {props.editMode ? (
                                              <IconButton
                                                  size="small"
                                                  onClick={() =>
                                                      props.onRemoveCastMember(
                                                          index
                                                      )
                                                  }
                                              >
                                                  <Delete />
                                              </IconButton>
                                          ) : (
                                              <IconButton
                                                  size="small"
                                                  onClick={props.toggleEditMode}
                                                  disabled={!props.isLoggedIn}
                                              >
                                                  <Edit />
                                              </IconButton>
                                          )}
                                      </TableCell>
                                  ) : null}
                              </TableRow>
                          ))
                        : null}
                    {/* give the opportunity to add a new cast member */}
                    {props.editMode ? (
                        <TableRow>
                            <TableCell>
                                <CustomTextField
                                    value={newActorName}
                                    editMode={props.editMode}
                                    onChange={(value) => setNewActorName(value)}
                                />
                            </TableCell>
                            <TableCell>as</TableCell>
                            <TableCell>
                                <CustomTextField
                                    value={newActorCharacter}
                                    editMode={props.editMode}
                                    onChange={(value) =>
                                        setNewActorCharacter(value)
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    size="small"
                                    onClick={onAddCastMember}
                                >
                                    <Add />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ) : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// attributes of props and their type
MovieCast.propTypes = {
    movieCast: PropTypes.array,
    editMode: PropTypes.bool,
    onAddCastMember: PropTypes.func.isRequired,
    onRemoveCastMember: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool,
    toggleEditMode: PropTypes.func.isRequired,
};

export default MovieCast;
