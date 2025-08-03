import { writeFileSync } from 'fs';

export class FileService {
  static writeJSON(path: string, data: any) {
    writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
  }
}
