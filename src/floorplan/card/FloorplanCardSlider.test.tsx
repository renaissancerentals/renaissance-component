import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {FloorplanCardSlider} from './FloorplanCardSlider';
import {FloorplanDetails, FloorplanStyle} from '../data/Floorplan';
import {Pet} from '../../unit/data/Unit';

const floorplans: FloorplanDetails[] = [
    {
        id: 'valencia',
        name: 'Valencia',
        bedroom: 1,
        bathroom: 1,
        style: FloorplanStyle.APARTMENT,
        specialRent: 0,
        specialRentStartDate: '',
        specialRentEndDate: '',
        address: '1100 N Walnut St',
        zipcode: '47404',
        featured: false,
        greenCertified: true,
        videoTourLink: 'https://youtu.be/lFZeh4jr9UI',
        threeSixtyVideoTourLink: null,
        virtualTourLink: 'https://www.paneek.net/#/tour/view/8392',
        photo: 'https://drive.google.com/uc?id=1ut81&export=download',
        coverImage: 'https://drive.google.com/uc?id=1ut81&export=download',
        floorPlanFolderId: 'folder-plan-1',
        photosFolderId: 'folder-photos-1',
        amenities: [],
        units: [
            {
                id: '1100-13',
                squareFoot: 710,
                rent: 1229.0,
                deposit: 600.0,
                discountedRent: 0.0,
                garages: 0,
                allowedPet: Pet.CAT,
                moveInDate: '2023-07-27',
                availabilityExtensionMonths: null,
                furnished: false
            }
        ],
        webSpecials: []
    },
    {
        id: 'madrid',
        name: 'Madrid',
        bedroom: 2,
        bathroom: 2,
        style: FloorplanStyle.APARTMENT,
        specialRent: 0,
        specialRentStartDate: '',
        specialRentEndDate: '',
        address: '1100 N Walnut St',
        zipcode: '47404',
        featured: true,
        greenCertified: true,
        videoTourLink: 'https://youtu.be/MSSC9-1tYXc',
        threeSixtyVideoTourLink: null,
        virtualTourLink: 'https://www.paneek.net/#/tour/view/8238',
        photo: 'https://drive.google.com/uc?id=1bY_Kz&export=download',
        coverImage: 'https://drive.google.com/uc?id=1bY_Kz&export=download',
        floorPlanFolderId: 'folder-plan-2',
        photosFolderId: 'folder-photos-2',
        amenities: [],
        units: [
            {
                id: '1100-11',
                squareFoot: 620,
                rent: 1174.0,
                deposit: 600.0,
                discountedRent: 0.0,
                garages: 0,
                allowedPet: Pet.CAT,
                moveInDate: '2023-07-28',
                availabilityExtensionMonths: null,
                furnished: false
            }
        ],
        webSpecials: []
    }
];

describe('FloorplanCardSlider', () => {
    it('renders a featured floorplan card for each floorplan', () => {
        render(<FloorplanCardSlider floorplans={floorplans} propertyId="verona-park"/>);

        expect(screen.getByText('Valencia')).toBeInTheDocument();
        expect(screen.getByText('Madrid')).toBeInTheDocument();
        expect(screen.getAllByText('Featured Floorplan').length).toBe(2);
    });

    it('applies the small size modifier class', () => {
        const {container} = render(<FloorplanCardSlider floorplans={floorplans} size="small" propertyId="verona-park"/>);

        expect(container.querySelector('.floorplan-card-slider--small')).toBeInTheDocument();
    });

    it('does not apply the small size modifier class by default', () => {
        const {container} = render(<FloorplanCardSlider floorplans={floorplans} propertyId="verona-park"/>);

        expect(container.querySelector('.floorplan-card-slider--small')).not.toBeInTheDocument();
        expect(container.querySelector('.floorplan-card--slider')).toBeInTheDocument();
    });

    it('navigates between floorplan cards using the slider nav buttons', async () => {
        const user = userEvent.setup();
        render(<FloorplanCardSlider floorplans={floorplans} propertyId="verona-park"/>);

        expect(screen.queryByTitle('Navigate Left')).not.toBeInTheDocument();
        const rightButtons = screen.getAllByTitle('Navigate Right');
        await user.click(rightButtons[rightButtons.length - 1]);

        expect(screen.getByTitle('Navigate Left')).toBeInTheDocument();
    });

    it('opens the video modal with the youtube embed when a video icon is clicked', async () => {
        const user = userEvent.setup();
        const {container} = render(<FloorplanCardSlider floorplans={floorplans} propertyId="verona-park"/>);

        expect(container.querySelector('iframe')).not.toBeInTheDocument();

        const videoIcons = screen.getAllByTitle('video icon');
        await user.click(videoIcons[0]);

        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('title', 'YouTube video player');
    });

    it('opens the video modal with the virtual tour link when the tour icon is clicked', async () => {
        const user = userEvent.setup();
        const {container} = render(<FloorplanCardSlider floorplans={floorplans} propertyId="verona-park"/>);

        const tourIcons = screen.getAllByTitle('tour icon');
        await user.click(tourIcons[0]);

        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('title', 'virtual tour');
        expect(iframe).toHaveAttribute('src', floorplans[0].virtualTourLink as string);
    });
});
