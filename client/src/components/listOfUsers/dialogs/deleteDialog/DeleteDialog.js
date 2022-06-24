import MainDialog from "../helpers/MainDialog";

const DeleteDialog = ({onClose, onConfirm}) => {

    const attributes = {
      deleteId: 1,
      content : "Are you sure you want to delete ?",
      onClose: onClose,
      onConfirm,
    }

    return (
      <MainDialog {...attributes} />
    )
}

export default DeleteDialog