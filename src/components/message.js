import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { grey } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/user/usersSlice";

function useStyles(isSender) {
  return makeStyles((theme) => ({
    message: {
      padding: theme.spacing(1),
      boxShadow: 0,
      maxWidth: "max-content",
      overflowWrap: "break-word",
      borderRadius: "20",
      backgroundColor: isSender ? "#3D3C3E" : "#F0E1FF",
      color: isSender ? "#fff" : "#000",
    },
    avatar: {
      backgroundColor: grey[500],
      marginRight: "-8px",
      height: "25px !important",
      width: "25px !important",
    },
    padding: {
      padding: "0px 0px 8px!important",
    },
    messageContent: {
      fontSize: "0.7rem",
      padding: 0,
    },
  }));
}

const Message = ({ message }) => {
  const currentUser = useSelector(selectUser);
  const classes = useStyles(currentUser?.id === message.user_id)();
  return (
    <Paper className={classes.message}>
      <CardHeader
        avatar={
          <Avatar aria-label="user-avatar" className={classes.avatar}>
            {message?.user_name.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        title={currentUser?.id === message.user_id ? "you" : message?.user_name}
        className={classes.padding}
      />
      <Typography
        className={classes.messageContent}
        variant="body2"
        component="p"
      >
        {message?.content}
      </Typography>
    </Paper>
  );
};

export default Message;
