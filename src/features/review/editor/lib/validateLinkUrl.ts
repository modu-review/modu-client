import {LinkProtocolOptions} from '@tiptap/extension-link';
import {ClientError, createClientError} from '@/shared/lib/utils/client-error';

type Props = {
  url: string;
  ctx: {
    defaultValidate: (url: string) => boolean;
    protocols: Array<LinkProtocolOptions | string>;
    defaultProtocol: string;
  };
  onError: (error: ClientError) => void;
};

function validateLinkUrl({url, ctx, onError}: Props): boolean {
  const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);

  if (!ctx.defaultValidate(parsedUrl.href) || url.startsWith('./')) {
    const linkError = createClientError('INVALID_LINK_URL');
    onError(linkError);

    return false;
  }

  const disallowedProtocols = ['javascript', 'data', 'ftp', 'file', 'mailto', 'http'];
  const protocol = parsedUrl.protocol.replace(':', '');

  if (protocol !== 'https' || disallowedProtocols.includes(protocol)) {
    const protocolError = createClientError('INVALID_LINK_PROTOCOL');
    onError(protocolError);

    return false;
  }

  return true;
}

export default validateLinkUrl;
