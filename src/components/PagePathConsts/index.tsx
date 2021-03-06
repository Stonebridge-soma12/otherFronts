export enum StaticPath {
	DASHBOARD = '/dashboard',
	DASHBOARD_PROJECTS = `/dashboard/projects`,
	DASHBOARD_NEW_PROJECT = '/dashboard/projects/new',
	MAIN = '/',
	LOGIN = '/login',
	PROFILE = '/profile',
	UPDATE_PASSWORD = '/password/update',
	PROFILE_MODIFY = '/profile/modify',
	PROJECT = '/project',
	PROJECT_SHARE_ROUTE = '/share/project',
	SIGN_UP = '/signup',
	ASSET_MAIN = '/asset',
	DATASET_STORE = '/dataset',
	CREATE_DATASET_STORE = '/dataset/create',
	PROJECT_DATASET_PAGE = '/project/dataset',
}

export enum QueryPath {
	DATASET_STORE_DEFAULT = '/dataset?searchType=&searchContent=&curPage=&pageSize=8&lastPage=&itemCount=',
}

export enum DynamicPath {
	PROJECT = '/project/:projectNo',
	PROJECT_FORMAT = '/project/%s',
	PROJECT_TRAIN = '/project/:projectNo/train',
	PROJECT_TRAIN_FORMAT = '/project/%s/train',
	PROJECT_TRAIN_DETAIL = '/project/:projectNo/train/:trainNo',
	PROJECT_TRAIN_DETAIL_FORMAT = '/project/%s/train/%s',
	PROJECT_CONFIG = '/project/:projectNo/config',
	PROJECT_CONFIG_FORMAT = '/project/%s/config',
	PROJECT_SHARE = '/share/project/:projectNo/room/:roomNo',
	PROJECT_SHARE_FORMAT = '/share/project/%s/room/%s',
	PROJECT_SHARE_CONFIG = '/share/project/:projectNo/room/:roomNo/config',
	PROJECT_SHARE_CONFIG_FORMAT = '/share/project/%s/room/%s/config',
	DASHBOARD_PROJECT_MODIFY = '/dashboard/project/:projectNo/modify',
	DASHBOARD_PROJECT_MODIFY_FORMAT = '/dashboard/project/%s/modify',
	PROJECT_DATASET_PAGE = '/project/:projectNo/dataset',
	PROJECT_DATASET_FORMAT = '/project/%s/dataset',
}

export type PagePathKey = keyof typeof StaticPath;
export const UndefinedPathNameNumber = 0;

export const pagePathNameToNumber: {
	[k in StaticPath]: number;
} = {
	'/dashboard/projects': 1,
	'/asset': 2,
	'/dashboard': UndefinedPathNameNumber,
	'/profile/modify': UndefinedPathNameNumber,
	'/': UndefinedPathNameNumber,
	'/login': UndefinedPathNameNumber,
	'/profile': UndefinedPathNameNumber,
	'/project': UndefinedPathNameNumber,
	'/signup': UndefinedPathNameNumber,
	'/share/project': UndefinedPathNameNumber,
	'/dashboard/projects/new': UndefinedPathNameNumber,
	'/password/update': UndefinedPathNameNumber,
	'/dataset': UndefinedPathNameNumber,
	'/dataset/create': UndefinedPathNameNumber,
	'/project/dataset': UndefinedPathNameNumber,
};
