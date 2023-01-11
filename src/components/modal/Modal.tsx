import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

interface IBasicModalProps {
  children: React.ReactNode;
  openPlaylistModal: () => void;
  closePlaylistModal: () => void;
  openModal: boolean;
}

export const BasicModal = (props: IBasicModalProps) => {
  const { children, openPlaylistModal, closePlaylistModal, openModal } = props;
  return (
    <div>
      <Modal
        open={openModal}
        onClose={closePlaylistModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};
