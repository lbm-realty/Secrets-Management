import { GET } from "@/app/api/greet/route";
import { NextRequest } from "next/server";

// helper to build a real NextRequest with query params
function makeRequest(type: string): NextRequest {
  return new NextRequest(
    new URL(`http://localhost:3000/api/greet?type=${type}`)
  );
}

// ─── Group 1: Happy path ──────────────────────────────────────────────────────

describe("GET /api/greet — happy path", () => {
  beforeEach(() => {
    process.env.HI_NAME = "Labeeb";
    process.env.BYE_NAME = "Friend";
  });

  afterEach(() => {
    delete process.env.HI_NAME;
    delete process.env.BYE_NAME;
  });

  it("returns 200 and a hi message when type=hi", async () => {
    const res = await GET(makeRequest("hi"));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.message).toContain("Labeeb");
    expect(body.secretKey).toBe("HI_NAME");
  });

  it("returns 200 and a bye message when type=bye", async () => {
    const res = await GET(makeRequest("bye"));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.message).toContain("Friend");
    expect(body.secretKey).toBe("BYE_NAME");
  });
});

// ─── Group 2: Missing secrets ─────────────────────────────────────────────────

describe("GET /api/greet — missing secrets", () => {
  beforeEach(() => {
    delete process.env.HI_NAME;
    delete process.env.BYE_NAME;
  });

  it("returns 500 when secrets are not set", async () => {
    const res = await GET(makeRequest("hi"));
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body.error).toMatch(/secrets not found/i);
  });
});

// ─── Group 3: Bad input ───────────────────────────────────────────────────────

describe("GET /api/greet — bad input", () => {
  beforeEach(() => {
    process.env.HI_NAME = "Labeeb";
    process.env.BYE_NAME = "Friend";
  });

  afterEach(() => {
    delete process.env.HI_NAME;
    delete process.env.BYE_NAME;
  });

  it("returns 400 when type is invalid", async () => {
    const res = await GET(makeRequest("hello"));
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.error).toMatch(/invalid type/i);
  });

  it("returns 400 when type is missing", async () => {
    const req = new NextRequest(
      new URL("http://localhost:3000/api/greet")
    );
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.error).toMatch(/invalid type/i);
  });
});
