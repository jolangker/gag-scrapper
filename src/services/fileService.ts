import fs from "fs/promises";

export class FileService {
  static async writeJSON(path: string, data: any) {
    await fs.writeFile(path, JSON.stringify(data, null, 2), 'utf8');
  }

  static async readJSON<T>(path: string): Promise<T> {
    const data = await fs.readFile(path, "utf-8");
    return JSON.parse(data) as T;
  }
}
