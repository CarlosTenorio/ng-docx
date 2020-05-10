import { FolderInterface } from './folderInterface';

export interface ConfigInterface {
    files: (string | FolderInterface)[];
    versions?: string[];
    editAssetsPath?: string;
}
