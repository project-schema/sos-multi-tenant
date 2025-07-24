import { Modal } from 'antd';

export const alertConfirm = ({
	onOk,
	onCancel,
	title = 'Confirm',
	content = 'Are you sure you want to proceed?',
}: {
	onOk: () => void;
	onCancel?: () => void;
	title?: string;
	content?: string;
}) => {
	Modal.confirm({
		title,
		content,
		centered: true,
		onOk: () => {
			if (onOk) onOk();
		},
		onCancel: () => {
			if (onCancel) onCancel();
		},
	});
};

/* How to use


 const onSubmit = async (values: any) => {
    // alertConfirm('Create', 'Are you sure?', () => {})
    
    alertConfirm({
      onOk: async () => {
        try {

          // try code 

        } catch (error) {
         
        // error code 

        }
      },

      // optional
      onCancel: () => {
      // 
       },
    })



  }


*/
