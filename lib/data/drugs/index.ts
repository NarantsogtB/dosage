import type { Drug } from "../../domain/drug";
import { acetylcysteine } from "./acetylcysteine";
import { aciclovir } from "./aciclovir";
import { albendazole } from "./albendazole";
import { ambroxol } from "./ambroxol";
import { amoxicillin } from "./amoxicillin";
import { amoxicillinClavulanate } from "./amoxicillin-clavulanate";
import { azithromycin } from "./azithromycin";
import { captopril } from "./captopril";
import { carbamazepine } from "./carbamazepine";
import { ceftriaxone } from "./ceftriaxone";
import { cephalexin } from "./cephalexin";
import { cetirizine } from "./cetirizine";
import { ciprofloxacin } from "./ciprofloxacin";
import { clarithromycin } from "./clarithromycin";
import { clonazepam } from "./clonazepam";
import { dexamethasone } from "./dexamethasone";
import { diazepam } from "./diazepam";
import { diphenhydramine } from "./diphenhydramine";
import { domperidone } from "./domperidone";
import { doxycycline } from "./doxycycline";
import { enalapril } from "./enalapril";
import { erythromycin } from "./erythromycin";
import { famotidine } from "./famotidine";
import { ferrousSulfate } from "./ferrous-sulfate";
import { fluconazole } from "./fluconazole";
import { furosemide } from "./furosemide";
import { gentamicin } from "./gentamicin";
import { hydrocortisone } from "./hydrocortisone";
import { ibuprofen } from "./ibuprofen";
import { isoniazid } from "./isoniazid";
import { loperamide } from "./loperamide";
import { loratadine } from "./loratadine";
import { mebendazole } from "./mebendazole";
import { methylprednisolone } from "./methylprednisolone";
import { metoclopramide } from "./metoclopramide";
import { metronidazole } from "./metronidazole";
import { nitrofurantoin } from "./nitrofurantoin";
import { omeprazole } from "./omeprazole";
import { ondansetron } from "./ondansetron";
import { paracetamol } from "./paracetamol";
import { phenobarbital } from "./phenobarbital";
import { prednisolone } from "./prednisolone";
import { promethazine } from "./promethazine";
import { propranolol } from "./propranolol";
import { rifampicin } from "./rifampicin";
import { salbutamol } from "./salbutamol";
import { sodiumValproate } from "./sodium-valproate";
import { spironolactone } from "./spironolactone";
import { tramadol } from "./tramadol";
import { zincSulfate } from "./zinc-sulfate";

/** Бүх эмийн жагсаалт. Шинэ эм нэмэхэд энд импорт + мөр нэмнэ. */
export const DRUGS: readonly Drug[] = [
  acetylcysteine,
  aciclovir,
  albendazole,
  ambroxol,
  amoxicillin,
  amoxicillinClavulanate,
  azithromycin,
  captopril,
  carbamazepine,
  ceftriaxone,
  cephalexin,
  cetirizine,
  ciprofloxacin,
  clarithromycin,
  clonazepam,
  dexamethasone,
  diazepam,
  diphenhydramine,
  domperidone,
  doxycycline,
  enalapril,
  erythromycin,
  famotidine,
  ferrousSulfate,
  fluconazole,
  furosemide,
  gentamicin,
  hydrocortisone,
  ibuprofen,
  isoniazid,
  loperamide,
  loratadine,
  mebendazole,
  methylprednisolone,
  metoclopramide,
  metronidazole,
  nitrofurantoin,
  omeprazole,
  ondansetron,
  paracetamol,
  phenobarbital,
  prednisolone,
  promethazine,
  propranolol,
  rifampicin,
  salbutamol,
  sodiumValproate,
  spironolactone,
  tramadol,
  zincSulfate,
];

/** id-гаар хурдан хайх хүснэгт. */
export const DRUG_BY_ID: ReadonlyMap<string, Drug> = new Map(
  DRUGS.map((drug) => [drug.id, drug]),
);
