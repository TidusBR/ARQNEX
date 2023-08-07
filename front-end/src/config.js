import YAML from 'yaml'

const response = await fetch("/config.yml");
export const config = YAML.parse(await response.text());