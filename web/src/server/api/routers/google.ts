import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import axios from "axios";

export const googleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  get: publicProcedure
    .input(
      z.object({
        chats: z.array(z.string()),
      })
    )
    .query(async ({ ctx, input }) => {
      const res = input.chats.map((v) => {
        return axios.get(
          `https://translate.google.com/m?sl=en&tl=hi&q=${v.replaceAll(
            " ",
            "+"
          )}&hl=en`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      });

      const resData = await Promise.all(res);

      const finalRes = resData.map((v) => {
        const htmlStr = v.data as string;
        const resultI = htmlStr.indexOf('<div class="result-container">');
        const restStr = htmlStr.slice(resultI + 30);
        const closingDivI = restStr.indexOf("</div>");
        const finalStr = restStr.slice(0, closingDivI);
        return finalStr;
      });

      return finalRes;
    }),
});
