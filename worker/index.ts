import {
  DEFAULT_DEVICE_SIZES,
  DEFAULT_IMAGE_SIZES,
  handleImageOptimization,
} from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

type AssetBinding = {
  readonly fetch: (request: Request) => Promise<Response>;
};

type ImageBinding = {
  readonly input: (stream: ReadableStream) => {
    readonly transform: (options: Readonly<Record<string, unknown>>) => {
      readonly output: (options: {
        readonly format: string;
        readonly quality: number;
      }) => Promise<{ readonly response: () => Response }>;
    };
  };
};

type Environment = {
  readonly ASSETS: AssetBinding;
  readonly IMAGES: ImageBinding;
};

type WorkerExecutionContext = {
  readonly waitUntil: (promise: Promise<unknown>) => void;
  readonly passThroughOnException: () => void;
};

const worker = {
  async fetch(
    request: Request,
    environment: Environment,
    context: WorkerExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(
        request,
        {
          fetchAsset: (path) =>
            environment.ASSETS.fetch(new Request(new URL(path, request.url))),
          transformImage: async (body, { width, format, quality }) => {
            const result = await environment.IMAGES.input(body)
              .transform(width > 0 ? { width } : {})
              .output({ format, quality });
            return result.response();
          },
        },
        allowedWidths,
      );
    }

    return handler.fetch(request, environment, context);
  },
};

export default worker;
