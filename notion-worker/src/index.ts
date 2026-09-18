import { Worker } from "@notionhq/workers";
import { registerTools } from "./tools.js";
import { registerSyncs } from "./syncs.js";
import { registerWebhooks } from "./webhooks.js";

const worker = new Worker();
export default worker;

registerTools(worker);
registerSyncs(worker);
registerWebhooks(worker);