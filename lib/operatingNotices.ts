export type NoticeType = {
  color: string;
  text: string;
};

export type NoticeMessage = {
  message: string;
  time: string;
  type: NoticeType;
};

export type OperatingNotice = {
  uuid: string;
  name: string;
  created: string;
  type: NoticeType;
  messages: NoticeMessage[];
};

export type OperatingNoticeData = {
  headerTitle?: string;
  headerText?: string;
  active: OperatingNotice[];
  historic: OperatingNotice[];
};

type OperatingNoticePayload = {
  status: boolean;
  data?: OperatingNoticeData;
};

export async function getOperatingNotices() {
  try {
    const response = await fetch("https://mktv.no/api/operatingnotice/data/", {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as OperatingNoticePayload;
    if (!payload.status || !payload.data) {
      return null;
    }

    return payload.data;
  } catch {
    return null;
  }
}
