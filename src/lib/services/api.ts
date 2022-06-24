const baseUrl = import.meta.env.VITE_PUBLIC_BASE_PATH

export const post = async (path:string, body: any = undefined) => { 
  try { 
    const result = await fetch(`${baseUrl}/${path}`,{method:"POST", body: body });
    if (result.status == 200)
     return result.json()
  } catch (e) { 
    return {data: undefined}
  }
}

export const get = async (path:string) => {
  try { 
    const result = await fetch(`${baseUrl}/${path}`);
    if (result.status === 200){
      return result.json();
    }
  } catch(e) { 
    return { data:undefined }
  }
}

// ADD other HTTP Method below
