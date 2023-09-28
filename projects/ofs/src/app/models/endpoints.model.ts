export enum Endpoints {
  // INPUT_FILE_UPLOAD = 'uploadofsfile/',

}

export function getAdress(api: Endpoints) {
  return 'http://localhost:8080/test/ofs/' + api;
}
