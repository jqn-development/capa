export const SET_UPLOAD_PROGRESS = "SET_UPLOAD_PROGRESS";
export const SET_UPLOAD_FILENAME = "SET_UPLOAD_FILENAME";
export const SET_UPLOAD_STATUS = "SET_UPLOAD_STATUS";
export const SET_UPLOAD_FILE_SIZE = "SET_UPLOAD_FILE_SIZE";

export interface SetUploadProgressAction {
    type: typeof SET_UPLOAD_PROGRESS;
    progress: number | null;
}

export interface SetUploadFilenameAction {
    type: typeof SET_UPLOAD_FILENAME;
    filename: string | null;
}

export interface SetUploadStatusAction {
    type: typeof SET_UPLOAD_STATUS;
    status: string | null;
}

export interface SetUploadFileSizeAction {
    type: typeof SET_UPLOAD_FILE_SIZE;
    filesize: number | null;
}

export type S3ActionTypes = SetUploadProgressAction | SetUploadFilenameAction | SetUploadStatusAction | SetUploadFileSizeAction;