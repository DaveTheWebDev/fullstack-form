import { EventDto } from "api/EventApi/EventApi.dto";

export interface GridProps {
  events: EventDto[];
  loading: boolean
}