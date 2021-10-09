const fs = require('fs');

export async function updateFileData(filePath, data ){
    try {
        const updatedData = await fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        return {
            status : 200,
            message : "Data updated successfully",
            data: data
        };
    } catch (err){
        return {
            status : 401,
            message : "Failed to update data",
            err: err
        };
    }
}

export async function readFileData(filePath ){
    try {
        
        const fileData = fs.readFileSync(filePath, 'utf8')
        return {
            status : 200,
            data: fileData
        };
    } catch (err){
        return {
            status : 401,
            message : "Failed to read file",
            err: err
        };
    }
}