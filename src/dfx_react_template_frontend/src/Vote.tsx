import { Box, Input, Button, Typography, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { dfx_react_template_rust_backend } from "../../declarations/dfx_react_template_rust_backend";
import { VoteItem } from "../../declarations/dfx_react_template_rust_backend/dfx_react_template_rust_backend.did";
interface VoteItemWithPercent extends VoteItem {
  percent: number;
}
const Vote = () => {
  const [votes, setVotes] = useState<VoteItemWithPercent[]>();
  const title = "select a,b,c?";
  useEffect(() => {
    (async () => {
      const res = await dfx_react_template_rust_backend.addVote(title, [
        "a",
        "b",
        "c",
      ]);
    })();
  }, []);
  const updateVoteWithPercent = (votes: VoteItem[]) => {
    // sum count of each item
    const sum = votes.reduce((acc, item) => {
      return acc + Number(item.count);
    }, 0);

    const tmp: VoteItemWithPercent[] = votes.map((item) => {
      return {
        ...item,
        percent:
          Number(item.count) === 0 ? 0 : (Number(item.count) / sum) * 100,
      };
    });
    setVotes(tmp);
  };
  useEffect(() => {
    (async () => {
      const res = await dfx_react_template_rust_backend.getVote(title);
      updateVoteWithPercent(res);
    })();
  }, []);

  const doVote = async (name: string) => {
    const res = await dfx_react_template_rust_backend.vote(title, name);
    updateVoteWithPercent(res);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography>
        Vote {title}:
        {votes?.map((item) => {
          return (
            <Typography
              key={item.name}
              onClick={async () => {
                await doVote(item.name);
              }}
            >
              {item.name} : {item.percent.toFixed(2)}%({item.count.toString()})
              <LinearProgress
                sx={{ height: 15, width: 150 }}
                variant="determinate"
                value={item.percent}
              />
            </Typography>
          );
        })}
      </Typography>
    </Box>
  );
};
export default Vote;
