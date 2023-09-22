import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createMockData } from "../mock";
import { SegmentNodeType } from "../model";

export default function handler(
	request: VercelRequest,
	response: VercelResponse
) {
	const { type } = request.query;
	// 生成随机数据
	const { data } = createMockData(type as SegmentNodeType);
	console.log(data);
	// 将随机数据作为JSON响应发送
	response.status(200).json(data);
}
