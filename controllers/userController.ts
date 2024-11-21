import { Request, Response } from "express";
import fs from "fs";
export const getData = (request: Request, response: Response) => {
  const data = JSON.parse(fs.readFileSync("./db.json").toString());
  console.log(request.query);
  //
  response.status(200).send(data.user);
};

export const addData = (req: Request, res: Response) => {
  console.log(req.body);
  // 1. Pastikan mengakses seluruh data dari db.json
  const data = JSON.parse(fs.readFileSync("./db.json").toString());
  // 2. Generate id baru untuk data yang baru
  const newId = data.user[data.user.length - 1].id + 1;
  // 3. Masukkan data baru beserta id baru kedalam data user
  data.user.push({ id: newId, ...req.body });
  // 4. Tulis ulang isi file db.json
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
  res.status(201).send({
    message: "Add data success",
    isSuccess: true,
  });
};

export const deleteData = (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync("./db.json").toString());
  const dataIdx: number = data.user.findIndex(
    (val: any) => val.id == req.params.id
  );

  data.user.splice(dataIdx, 1); // menghapus data berdasarkan idx yang ditemukan
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));

  res.status(200).send({
    message: `Deleted data user ${req.params.id} success`,
    success: true,
  });
};

export const updateData = (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync("./db.json").toString());
  const dataIdx: number = data.user.findIndex(
    (val: any) => val.id == req.params.id
  );

  data.user[dataIdx] = { ...data.user[dataIdx], ...req.body };
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));

  res.status(200).send({
    message: `Updated data user ${req.params.id} success`,
    success: true,
  });
};
