import { faker } from "@faker-js/faker";
import { SegmentNodeType } from "./model";
import { uniqBy } from "lodash";

// 候选的工作名称列表
const PIER_BODY = ["Φ1.8墩身", "Φ2.0墩身", "Φ2.5墩身", "Φ1.5墩身", "Φ2.2墩身"];
const PILE_FOUNDATION = [
	"Φ1.8桩基础",
	"Φ2.0桩基础",
	"Φ2.5桩基础",
	"Φ1.5桩基础",
	"Φ2.2桩基础",
];
const BRIDGE_DECK = [
	"Φ1.8桥台",
	"Φ2.0桥台",
	"Φ2.5桥台",
	"Φ1.5桥台",
	"Φ2.2桥台",
];
const CUSHION_CAP = [
	"Φ1.8承台",
	"Φ2.0承台",
	"Φ2.5承台",
	"Φ1.5承台",
	"Φ2.2承台",
];
const BENT_CAP = ["Φ1.8盖梁", "Φ2.0盖梁", "Φ2.5盖梁", "Φ1.5盖梁", "Φ2.2盖梁"];
const BEAM_ERECTION = [
	"Φ1.8架梁",
	"Φ2.0架梁",
	"Φ2.5架梁",
	"Φ1.5架梁",
	"Φ2.2架梁",
];
const BINDER = ["Φ1.8系梁", "Φ2.0系梁", "Φ2.5系梁", "Φ1.5系梁", "Φ2.2系梁"];
const BRIDGE_DECK_SYSTEM = [
	"Φ1.8桥面系",
	"Φ2.0桥面系",
	"Φ2.5桥面系",
	"Φ1.5桥面系",
	"Φ2.2桥面系",
];
export const WORK_NAMES: Record<SegmentNodeType, string[]> = {
	[SegmentNodeType.PIER_BODY]: PIER_BODY, // 墩身
	[SegmentNodeType.PILE_FOUNDATION]: PILE_FOUNDATION, // 桩基
	[SegmentNodeType.BRIDGE_DECK]: BRIDGE_DECK, // 桥台
	[SegmentNodeType.CUSHION_CAP]: CUSHION_CAP, // 承台
	[SegmentNodeType.BENT_CAP]: BENT_CAP, // 盖梁
	[SegmentNodeType.BEAM_ERECTION]: BEAM_ERECTION, // 架梁
	[SegmentNodeType.BINDER]: BINDER, // 系梁
	[SegmentNodeType.BRIDGE_DECK_SYSTEM]: BRIDGE_DECK_SYSTEM, // 桥面系
	[SegmentNodeType.REQUISITION]: [], // 征拆
};

export const TYPE_NAME: Record<SegmentNodeType, string> = {
	[SegmentNodeType.PIER_BODY]: "墩身",
	[SegmentNodeType.PILE_FOUNDATION]: "桩基",
	[SegmentNodeType.BRIDGE_DECK]: "桥台",
	[SegmentNodeType.CUSHION_CAP]: "承台",
	[SegmentNodeType.BENT_CAP]: "盖梁",
	[SegmentNodeType.BEAM_ERECTION]: "架梁",
	[SegmentNodeType.BINDER]: "桩系梁",
	[SegmentNodeType.BRIDGE_DECK_SYSTEM]: "桥面系",
	[SegmentNodeType.REQUISITION]: "征拆",
};

// 随机生成整数
function randomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// 生成随机资源列表
const randomResourceList = (name: string) => {
	return Array.from({ length: 1 }, () => ({
		id: faker.string.uuid(),
		resourceName: `${name}模板`,
		resourceNum: randomInt(1, 10),
		resourceUnit: "套",
	}));
};

// 生成随机工作信息
const randomWorkInfo = (type: SegmentNodeType) => {
	const name = faker.helpers.arrayElement(WORK_NAMES[type]);
	return {
		name,
		theoryWork: randomInt(10, 20),
		actualWork: randomInt(5, 15),
		workUnit: "天/个",
		id: faker.string.uuid(),
		resourceList: randomResourceList(name), // 生成随机资源列表
	};
};

// 生成随机明细表
const randomDetailTable = (type: SegmentNodeType) => {
	return {
		id: faker.string.uuid(),
		name: faker.helpers.arrayElement(WORK_NAMES[type]),
		actualStartDate: faker.date.past().toISOString(),
		actualEndDate: faker.date.future().toISOString(),
		status: randomInt(0, 2),
	};
};

// 生成多个随机明细信息
const randomDetailInfo = (type: SegmentNodeType) => {
	return {
		title:
			type === SegmentNodeType.BRIDGE_DECK ||
			type === SegmentNodeType.CUSHION_CAP
				? `左幅${randomInt(0, 30)}号台`
				: type === SegmentNodeType.BENT_CAP
				? `盖梁（${randomInt(1, 30)}号墩）`
				: faker.helpers.arrayElement(WORK_NAMES[type]),
		id: faker.string.uuid(),
		status: randomInt(0, 2),
		planStartDate: faker.date.past().toISOString(),
		planEndDate: faker.date.future().toISOString(),
		expectedEndDate: faker.date.future().toISOString(),
		actualStartDate: faker.date.past().toISOString(),
		actualEndDate: faker.date.future().toISOString(),
		detailTable: Array.from({ length: 3 }, () => randomDetailTable(type)), // 生成3个随机明细表
	};
};

// 生成随机 summaryInfo
const randomSummaryInfo = () => {
	return {
		planStartDate: faker.date.past().toISOString(),
		planEndDate: faker.date.future().toISOString(),
		actualStartDate: faker.date.past().toISOString(),
		expectedEndDate: faker.date.future().toISOString(),
		designTotal: randomInt(80, 120),
		finishAmount: randomInt(5, 30),
		residueQuantity: randomInt(50, 100),
		unit: "个",
	};
};

// 生成随机数据
export const data = {
	code: 0,
	message: "success",
	data: {
		type: "bridge_xbjg_gl",
		title: "盖梁/港珠澳大桥-左幅",
		summaryInfo: randomSummaryInfo(), // 生成随机 summaryInfo
		workInfo: Array.from({ length: 3 }, () =>
			randomWorkInfo("bridge_xbjg_gl" as SegmentNodeType)
		), // 生成3个随机工作信息
		detailInfo: Array.from({ length: 10 }, () =>
			randomDetailInfo("bridge_xbjg_gl" as SegmentNodeType)
		), // 生成3个随机明细信息
	},
};
export function createCurrentStructureId() {
	return data?.data?.detailInfo[randomInt(0, 9)]?.id;
}

/**
 * 生成随机数据
 * @param type
 * @param workInfoLength
 * @param detailInfoLength
 * @returns
 */
export function createMockData(
	type: SegmentNodeType,
	workInfoLength?: number,
	detailInfoLength?: number
) {
	const data = {
		code: 0,
		message: "success",
		data: {
			type: type ?? SegmentNodeType.BENT_CAP,
			title: `${TYPE_NAME[type ?? SegmentNodeType.BENT_CAP]}/港珠澳大桥-左幅`,
			summaryInfo: randomSummaryInfo(), // 生成随机 summaryInfo
			workInfo: uniqBy(
				Array.from({ length: workInfoLength ?? 5 }, () =>
					randomWorkInfo(type ?? SegmentNodeType.BENT_CAP)
				)?.sort(
					(a, b) =>
						Number(a.name?.match(/\d+(\.\d+)?/g)?.[0]) -
						Number(b?.name?.match(/\d+(\.\d+)?/g)?.[0])
				),
				"name"
			), // 生成5个随机工作信息
			detailInfo: uniqBy(
				Array.from({ length: detailInfoLength ?? 10 }, () =>
					randomDetailInfo(type ?? SegmentNodeType.BENT_CAP)
				)?.sort(
					(a, b) =>
						Number(a.title?.match(/\d+(\.\d+)?/g)?.[0]) -
						Number(b?.title?.match(/\d+(\.\d+)?/g)?.[0])
				),
				"title"
			),
			// 生成10个随机明细信息
		},
	};
	const currentStructureId = data?.data?.detailInfo[randomInt(0, 9)]?.id;
	return { data, currentStructureId };
}
