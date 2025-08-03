import fs from "fs/promises";
import path from "path";
import type { Meta } from "../types/recipe";

export class MetaService {
  private metaPath: string;

  constructor() {
    this.metaPath = path.resolve(process.cwd(), "data/meta.json");
  }

  async get(): Promise<Meta> {
    const data = await fs.readFile(this.metaPath, "utf-8");
    return JSON.parse(data);
  }

  async save(meta: Meta): Promise<void> {
    await fs.writeFile(this.metaPath, JSON.stringify(meta, null, 2), "utf-8");
  }
}
