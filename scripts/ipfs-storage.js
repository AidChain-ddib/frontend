import { create } from "ipfs-http-client"

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: "Basic " + Buffer.from("project_id:project_secret").toString("base64"),
  },
})

export async function uploadToIPFS(file) {
  try {
    const result = await ipfs.add(file)
    console.log("File uploaded to IPFS:", result.path)
    return result.path
  } catch (error) {
    console.error("IPFS upload failed:", error)
    throw error
  }
}

export async function uploadJSONToIPFS(data) {
  try {
    const jsonString = JSON.stringify(data)
    const result = await ipfs.add(jsonString)
    console.log("JSON uploaded to IPFS:", result.path)
    return result.path
  } catch (error) {
    console.error("IPFS JSON upload failed:", error)
    throw error
  }
}

export async function getFromIPFS(hash) {
  try {
    const chunks = []
    for await (const chunk of ipfs.cat(hash)) {
      chunks.push(chunk)
    }
    const data = Buffer.concat(chunks)
    return data
  } catch (error) {
    console.error("IPFS retrieval failed:", error)
    throw error
  }
}

export async function uploadProjectDocuments(projectId, documents) {
  const uploadedDocs = []

  for (const doc of documents) {
    try {
      const ipfsHash = await uploadToIPFS(doc.file)
      uploadedDocs.push({
        title: doc.title,
        type: doc.type,
        ipfsHash: ipfsHash,
        uploadDate: new Date().toISOString(),
      })
    } catch (error) {
      console.error(`Failed to upload document ${doc.title}:`, error)
    }
  }

  const projectMetadata = {
    projectId: projectId,
    documents: uploadedDocs,
    timestamp: new Date().toISOString(),
  }

  const metadataHash = await uploadJSONToIPFS(projectMetadata)
  return { metadataHash, documents: uploadedDocs }
}

export async function uploadMilestoneEvidence(projectId, milestoneId, evidence) {
  const evidenceData = {
    projectId: projectId,
    milestoneId: milestoneId,
    evidence: evidence,
    timestamp: new Date().toISOString(),
    submitter: evidence.submitter,
  }

  const evidenceHash = await uploadJSONToIPFS(evidenceData)
  return evidenceHash
}
