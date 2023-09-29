import { Select, Option } from "@material-tailwind/react";
 
export function SelectOrder() {
  return (
    <div className="w-72">
      <Select label="Ordenar por">
        <Option>Lo mas nuevo</Option>
        <Option>De menor a mayor precio</Option>
        <Option>De mayor a menor precio</Option>
        <Option>Nombre de A-Z</Option>
        <Option>Nombre de Z-A</Option>
      </Select>
    </div>
  );
}