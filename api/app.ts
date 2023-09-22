import express from "express";
import { createMockData } from "../mock";
import { SegmentNodeType } from "../model";

const app = express();
const port = process.env.PORT || 3000;

app.get("/mock/random-data/:type", (req, res) => {
	// 获取 'type' 参数的值
	const { type } = req.params;
	// 生成随机数据
	const { data } = createMockData(type as SegmentNodeType);
	console.log(data);
	// 将随机数据作为JSON响应发送
	res.json(data);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

export default app;
