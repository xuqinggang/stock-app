/**
 * 获取趋势向上的股票信息(历史日行情k线数据
 */
import axios from "axios";

const COZE_API_KEY = "pat_mFJFEbTlIwv0lSiImVRHfhZhOpsScA0656VUFwTh7UXz0d24xpZT16qguzOYxFHv";
const COZE_BOT_ID = "7468929098497638438";
interface IParams {

}
export const get = async ({}: IParams) => {
  // "conversation_id": "44d8f586-ed2c-4685-b154-40555ce4f8d6@2",
  axios.post("http://127.0.0.1:8000/v1/chat/completions", {}, {
    headers: {
      Authorization: "Bearer 8NxukzSwAXUDDzZmmFI1nIZCTAWls1Y3xP2woG9tAIbyjlr9vCX9R9N8sr1tUPlm",
    },
  })
}
