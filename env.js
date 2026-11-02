// Read only the hub token; never upload the .env file or its other credentials.
export function tokenFromEnv(text){
 let token='';
 for(let line of text.replace(/^\uFEFF/,'').split(/\r?\n/)){
  line=line.trim().replace(/^export\s+/,'');
  const match=/^HUB_TOKEN\s*=\s*(.*)$/.exec(line);
  if(!match)continue;
  let value=match[1].trim();
  if(value.startsWith('"')||value.startsWith("'")){
   const end=value.indexOf(value[0],1);
   if(end<0||!/^\s*(#.*)?$/.test(value.slice(end+1)))throw Error('HUB_TOKEN has an invalid quoted value.');
   value=value.slice(1,end);
  }else value=value.replace(/\s+#.*$/,'').trim();
  token=value.trim();
 }
 if(!token)throw Error('No HUB_TOKEN found in .env. Add your personal viewer token as HUB_TOKEN.');
 return token;
}
