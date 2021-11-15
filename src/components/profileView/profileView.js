import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "gatsby";
import { selectUser } from "../../redux/features/user/usersSlice";
import { AiOutlineUserDelete } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import {
  deleteProfile,
  deleteProfileImage,
  selectProfile,
} from "../../redux/features/profile/profileSlice";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Badge, Chip } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import Gallery from "../gallery/gallery";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: "12px",
    flexDirection: "column",
    padding: theme.spacing(2),
    margin: 0,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: theme.palette.secondary.light,
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
    listStyle: "none",
  },
  center: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "max-content",
  },
  chips: {
    backgroundColor: "#9D5BFF",
    color: "white",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.light,
    height: "54px !important",
    width: "54px !important",
    margin: "10px auto",
    "& img": {
      width: "100%",
    },
  },
  buttonContainer: {
    marginLeft: "auto",
    width: "max-content",
  },
  deleteBadge: {
    cursor: "pointer",
    color: red[300],
  },
}));

const ProfileView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);
  const currentUser = useSelector(selectUser);

  const deleteUserProfile = () => {
    if (currentUser) {
      dispatch(
        deleteProfile({
          userDetails: {
            user_id: currentUser.id,
            profile_id: profile.id,
          },
          navigate,
        })
      );
    }
  };
  console.log(profile);
  return (
    <div
      style={{ height: "90vh" }}
      className="flex justify-center items-center"
    >
      <div className="flex flex-col gap-x-2 w-4/5 p-10 bg-black m-auto border-2 border-purple rounded-md">
        <div className="flex flex-gap-2 ml-auto max-w-max">
          <FaUserEdit
            className="cursor-pointer text-gray text-lg"
            onClick={() => navigate("edit")}
          />
          <AiOutlineUserDelete
            className="cursor-pointer text-lg text-gray"
            onClick={() => deleteUserProfile()}
          />
        </div>
        <h1 className="text-4xl text-purple">Profile</h1>

        {profile && (
          <div>
            {profile.profile_img ? (
              <div className={classes.center}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  badgeContent={
                    <FaTrashAlt
                      className="cursor-pointer text-red"
                      onClick={() => dispatch(deleteProfileImage())}
                    />
                  }
                >
                  <Avatar
                    src={profile.profile_img}
                    className={classes.avatar}
                  />
                </Badge>
              </div>
            ) : (
              <Avatar aria-label="user-avatar" className={classes.avatar}>
                {profile?.user_name.slice(0, 1).toUpperCase()}
              </Avatar>
            )}
            <h1 className="text-2xl text-purple mx-auto w-max">
              {profile?.user_name}
            </h1>
            <span className="mt-1 text-sm">Interests</span>
            {profile.interests?.length && (
              <ul className={classes.list}>
                {profile.interests.map((data, i) => {
                  return (
                    <li key={i}>
                      <Chip label={data} className={classes.chips} />
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="pt-10">
              <Gallery heading="Your Chatrooms" type="user" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
