import { GridRowsProp } from "@mui/x-data-grid/models";
import { EventDto } from "../../../api/EventApi/EventApi.dto";

export interface GridProps {
  events: EventDto[];
  loading: boolean
}