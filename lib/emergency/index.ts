import { DRUGS } from "../data/drugs";
import { EMERGENCY_ITEMS } from "../calculators/emergency/items";
import { emergencyDrugs } from "./emergency-drugs";
import { shownItems } from "./shown-items";

/** `/emergency`-ийн эх сурвалжтай эмүүд — build үед нэг удаа. */
export const EMERGENCY_DRUGS = emergencyDrugs(DRUGS);

/** `/emergency`-ийн эх сурвалжтай эм бус мөрүүд. */
export const EMERGENCY_SHOWN_ITEMS = shownItems(EMERGENCY_ITEMS);
