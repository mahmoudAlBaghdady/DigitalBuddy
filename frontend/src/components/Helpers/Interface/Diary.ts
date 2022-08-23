interface Event {
  id: number;
  title: string;
  description: string;
}

export interface DiarySingle {
  description: string;
  title: string;
  _id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  events: Event[];
}
export interface Diary {
  description: string;
  title: string;
  events: Event[];
}
