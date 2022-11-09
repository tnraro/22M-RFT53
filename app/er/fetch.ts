export const erFetch = async (path: string) => {
  if (process.env.KEY == null)
    throw new Error("No such env KEY");
  const baseurl = "https://open-api.bser.io/v1";
  const url = baseurl + path;
  const res = await fetch(url, {
    headers: {
      "x-api-key": process.env.KEY,
    }
  });
  if (res.status >= 400) {
    throw new Error(res.statusText);
  }
  const body = await res.json();
  if (body.code >= 400) {
    throw new Error(body.message);
  }
  return body;
}
export const fetchCharacter = async () => {
  const body = await erFetch("/data/Character");
  return body.data;
}
export const fetchCharacterSkin = async () => {
  const body = await erFetch("/data/CharacterSkin");
  return body.data;
}
export const fetchItemArmor = async () => {
  const body = await erFetch("/data/ItemArmor");
  return body.data;
}
export const fetchItemWeapon = async () => {
  const body = await erFetch("/data/ItemWeapon");
  return body.data;
}
export const fetchL10n = async (language = "Korean") => {
  const body = await erFetch(`/l10n/${language}`);
  const res = await fetch(body.data.l10Path, { cache: "force-cache" });
  if (res.status >= 400) {
    throw new Error(res.statusText);
  }
  const text = await res.text();
  return text;
}