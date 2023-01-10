export interface ILambdaReturnType {
  status:
    | "CANCELLED"
    | "CANCELLING"
    | "COMPLETED"
    | "CREATED"
    | "EXPIRED"
    | "FAILED"
    | "RUNNING"
    | "FREE"
    | "BUSY"
    | "WAITING"
    | "NO-PENDING-WORK";
  id?: string;
  bucket?: string;
  filesCreated?: string[];
  objectsCount?: number;
}
