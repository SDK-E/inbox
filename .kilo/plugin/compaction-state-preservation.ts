import type { Plugin } from "@kilocode/plugin";

const CompactionStatePreservation: Plugin = async () => ({
  "experimental.session.compacting": async (_input, output) => {
    output.context.push(
      "## Persist across compaction\n- current task status\n- files being actively edited\n- key decisions",
    );
  },
});

export default {
  id: "compaction-state-preservation",
  server: CompactionStatePreservation,
};
