import React, { useContext, useState } from 'react';
import AddRoomForm from '../../component/Forms/AddRoomForm';
import { imgUpload } from '../../api/utils';
import { AuthContext } from '../../providers/AuthProvider';
import { addRoom } from '../../api/rooms';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      })
    const [loading, setLoading] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image');

    const handleSubmit =(e)=>{
        e.preventDefault();
        setLoading(false);
        const location = e.target.location.value;
        const category = e.target.category.value;
        const title = e.target.title.value;
        const from = dates.startDate;
        const to = dates.endDate;
        const price = e.target.price.value;
        const bedrooms = e.target.bedrooms.value;
        const bathrooms = e.target.bathrooms.value;
        const description = e.target.description.value;
        const guest = e.target.total_guest.value;
        const image = e.target.elements.image.files[0];
        setUploadButtonText('...uploading')
        console.log(from, to)

        // upload image
        imgUpload(image).then(res => {
            // console.log(res.data.display_url)
            const roomData = {
                image: res.data.display_url,
                location,
                category,
                 title,price, bedrooms, description,bathrooms, 
                host:{
                    name: user?.displayName,
                    image: user?.photoURL,
                    email: user?.email
                },
                to, 
                from,
                guest
            }

            addRoom(roomData)
            .then(data => {
                setUploadButtonText('uploaded!')
                setLoading(false)
                toast.success('Room Added!')
                navigate('/dashboard/my-listings')
                console.log(data)})
            .catch(err => console.log(err));


            // console.log(roomData)
            setLoading(false)
        }).catch(error => {
            console.log(error.message)
            setLoading(false)
        })
    }


    const handleImageChange=(image)=>{
        setUploadButtonText(image.name)
    }

    const handleDates = (ranges)=>{
        setDates(ranges.selection)

    }

    return (
        <div>
           <AddRoomForm handleSubmit={handleSubmit} loading={loading} handleImageChange={handleImageChange} dates={dates} uploadButtonText={uploadButtonText} handleDates={handleDates}></AddRoomForm>
        </div>
    );
};

export default AddRoom;