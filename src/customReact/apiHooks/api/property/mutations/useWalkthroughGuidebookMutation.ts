import { propertyWalkthroughGuidebookEndpoint } from '../../../../../api/property/endpoints';
import { useAppMutation } from '../../../useAppMutation/useAppMutation';

export const useWalkthroughGuidebookMutation = () => {
  return useAppMutation<{ id: number; form_data: string }>({
    url: propertyWalkthroughGuidebookEndpoint,
    method: 'PUT',
  });
};
