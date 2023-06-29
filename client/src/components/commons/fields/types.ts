interface IFieldT {
  label: string;
  placeholder?: string;
  type?: string;
  readonly?: boolean;
  val: string | number;
  id: number;
  field: string;
  variable?: boolean;
}

interface IFieldS extends IFieldT {
  values: string[];
}

interface IFieldF extends IFieldT {}

export type { IFieldT, IFieldS, IFieldF };
