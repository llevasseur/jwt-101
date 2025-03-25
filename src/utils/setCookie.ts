import Cookie from "js-cookie";

export default function setCookie(name: string, value: string, hours: number) {
  const date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000); // Convert hours to milliseconds
  Cookie.set(name, value, { expires: date });
}
