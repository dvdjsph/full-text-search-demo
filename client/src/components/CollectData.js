import React, {useState} from 'react';
import axios from "axios";
import SearchData from "./SearchData";
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default () => {
	  const [selectedFile, setSelectedFile] = useState();
	  const [isFilePicked, setIsFilePicked] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
	  const changeHandler = (event) => {
		    setSelectedFile(event.target.files[0]);
		    setIsFilePicked(true);
	  };

	  const handleSubmission = async () => {
        setIsProcessing(true);
		    const formData = new FormData();
        formData.append('File', selectedFile);

        const res = await axios({
            method: "post",
            url: "/upload",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(res);
        setIsProcessing(false);

	  };


    return (<div>
        { isProcessing &&
          <Dialog open={isProcessing} fullWidth>
            <DialogTitle>
              <LinearProgress />
            </DialogTitle>
            <DialogContent>
              <DialogContentText >
                Creating lexeme vectors for full text search.  This may take a couple of minutes...
              </DialogContentText>
            </DialogContent>

          </Dialog>
          

        }
        <Button
          variant="contained"
          component="label"
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={changeHandler} 
          />
        </Button>

			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>

				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<Button onClick={handleSubmission}>Submit</Button>
			</div>
        {
            isFilePicked && <SearchData/>
        }

            </div>);
};
