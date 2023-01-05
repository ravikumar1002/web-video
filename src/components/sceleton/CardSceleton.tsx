import { Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const CardSceleton = () => {
  return (
    <Box>
      <Skeleton variant="rectangular" height={190} />
      <div
        style={{
          display: "flex",
        }}
      >
        <div>
          <Skeleton variant="circular" width={40} height={40} />
        </div>
        <div
          style={{
            flexGrow: "1",
          }}
        >
          <Typography variant="h5">
            <Skeleton variant="text" />
          </Typography>
          <Typography variant="h5">
            <Skeleton variant="text" />
          </Typography>
          <Typography variant="caption">
            <Skeleton variant="text" />
          </Typography>
        </div>
      </div>
    </Box>
  );
};
