import { expose } from 'comlink';
import { EncodeOptions as MozJPEGEncoderOptions } from '../mozjpeg/encoder-meta';
import { QuantizeOptions } from '../imagequant/processor-meta';
import { EncodeOptions as OptiPNGEncoderOptions } from '../optipng/encoder-meta';
import { EncodeOptions as WebPEncoderOptions } from '../webp/encoder-meta';

async function mozjpegEncode(
  data: ImageData, options: MozJPEGEncoderOptions,
): Promise<ArrayBuffer> {
  const { encode } = await import(
    /* webpackChunkName: "process-mozjpeg-enc" */
    '../mozjpeg/encoder',
  );
  return encode(data, options);
}

async function quantize(data: ImageData, opts: QuantizeOptions): Promise<ImageData> {
  const { process } = await import(
    /* webpackChunkName: "process-imagequant" */
    '../imagequant/processor',
  );
  return process(data, opts);
}

async function optiPngEncode(
  data: BufferSource, options: OptiPNGEncoderOptions,
): Promise<ArrayBuffer> {
  const { compress } = await import(
    /* webpackChunkName: "process-optipng" */
    '../optipng/encoder',
  );
  return compress(data, options);
}

async function webpEncode(
  data: ImageData, options: WebPEncoderOptions,
): Promise<ArrayBuffer> {
  const { encode } = await import(
    /* webpackChunkName: "process-webp-enc" */
    '../webp/encoder',
  );
  return encode(data, options);
}

async function webpDecode(data: ArrayBuffer): Promise<ImageData> {
  const { decode } = await import(
    /* webpackChunkName: "process-webp-dec" */
    '../webp/decoder',
  );
  return decode(data);
}

const exports = { mozjpegEncode, quantize, optiPngEncode, webpEncode, webpDecode };
export type ProcessorWorkerApi = typeof exports;

expose(exports, self);
