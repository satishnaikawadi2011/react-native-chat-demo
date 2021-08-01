export interface Message {
	seen: boolean;
	_id: string;
	content: string;
	to: string;
	from: string;
	type: string;
	cause: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	isSent?: boolean;
	clientSideId?: string;
}
