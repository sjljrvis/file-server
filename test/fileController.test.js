const request = require("supertest");
const baseURL = "http://localhost:5555/api";
require("../db");

let fileId = "";

beforeAll(() => {
  db.remove({}, (err, data) => {
    console.log("Clearing DB", data);
  });
});

afterAll(() => {
  db.remove({}, (err, data) => {});
});

describe("File API", () => {
  describe("post /file", () => {
    it("should upload file", async () => {
      const response = await request(baseURL)
        .post("/file")
        .attach("file", "test/artifacts/sample.jpg");
      fileId = response.body.data._id;
      expect(response.body.message).toBe("File uploaded");
      expect(response.body.data.originalName).toBe("sample.jpg");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("get /file/<:image_id>", () => {
    it("should get a file", async () => {
      const response = await request(baseURL).get(`/file/${fileId}`);
      expect(response.statusCode).toBe(200);
    });

    it("should return 404 error", async () => {
      const response = await request(baseURL).get(`/file/random-file-id`);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("File not found");
    });
  });

  describe("get /file/all", () => {
    it("should list of files", async () => {
      const response = await request(baseURL).get(`/file/all`);
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toHaveLength(1);
    });
  });

  describe("put /file/<:image_id>", () => {
    it("should update and replace a file", async () => {
      const response = await request(baseURL)
        .put(`/file/${fileId}`)
        .attach("file", "test/artifacts/sample-1.jpg");
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("File Updated");
      expect(response.body.data.originalName).toBe("sample-1.jpg");
    });

    it("should return 404 error if file does not exist", async () => {
      const response = await request(baseURL)
        .put(`/file/randome-id`)
        .attach("file", "test/artifacts/sample-1.jpg");
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("File not found");
    });
  });

  describe("delete /file/<:image_id>", () => {
    it("should delete a file", async () => {
      const response = await request(baseURL).delete(`/file/${fileId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("File removed");
    });

    it("should return 404 error if file does not exist", async () => {
      const response = await request(baseURL).delete(`/file/random-id`);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("File not found");
    });
  });
});
