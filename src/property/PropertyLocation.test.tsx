import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PropertyLocation} from './PropertyLocation';
import {LeasingOfficeType, LeaseType, Property} from './data/Property';

const property = (overrides: Partial<Property> = {}): Property => ({
    name: 'HighGrove',
    id: 'high-grove',
    address: '123 Main St',
    zipcode: '47401',
    phone: '3175551234',
    email: 'info@example.com',
    rating: 5,
    amenities: [],
    description: 'A great place to live',
    secondaryEmail: '',
    facebookLink: '',
    twitterLink: '',
    htmlTitle: '',
    metaDescription: '',
    logo: null,
    leasingOfficeType: LeasingOfficeType.ON_SITE,
    leasingOffice: undefined,
    coverImage: null,
    coverVideo: null,
    propertyFolderId: '',
    photosFolderId: '',
    youtubeLink: '',
    ratingLink: '',
    conversionTrackingId1: '',
    conversionTrackingId2: '',
    teamMembers: [],
    busRoutes: [],
    leaseType: LeaseType.YEARLY,
    ...overrides
});

describe('PropertyLocation', () => {
    it('renders both skeletons when isLoading is true', () => {
        const {container} = render(
            <PropertyLocation property={property()} isLoading={true} handleRefToContact={vi.fn()}/>
        );

        expect(container.querySelector('.property-location')).toBeInTheDocument();
        expect(container.querySelector('.lease-office')).toBeInTheDocument();
        const skeletons = container.querySelectorAll('.react-loading-skeleton');
        expect(skeletons.length).toBe(6);
        expect(screen.queryByText('HighGrove')).not.toBeInTheDocument();
    });

    it('renders the property name, address link, and formatted phone number when loaded', () => {
        render(
            <PropertyLocation property={property()} isLoading={false} handleRefToContact={vi.fn()}/>
        );

        expect(screen.getByRole('heading', {name: 'HighGrove'})).toBeInTheDocument();
        expect(screen.getByText('123 Main St, 47401')).toHaveAttribute(
            'href',
            'https://www.mapquest.com/search/' + encodeURIComponent('123 Main St,47401')
        );
        expect(screen.getByText('(317)-555-1234')).toHaveAttribute('href', 'tel:3175551234');
    });

    it('calls handleRefToContact when the contact form link is clicked', async () => {
        const user = userEvent.setup();
        const handleRefToContact = vi.fn();

        render(
            <PropertyLocation property={property()} isLoading={false} handleRefToContact={handleRefToContact}/>
        );

        await user.click(screen.getByText('Submit a Contact Form'));

        expect(handleRefToContact).toHaveBeenCalledTimes(1);
    });

    it('renders bus routes when present', () => {
        const propertyWithBusRoutes = property({
            busRoutes: [
                {busRoute: 'Route 1', busRouteLink: 'https://example.com/route1'},
                {busRoute: 'Route 2', busRouteLink: 'https://example.com/route2'}
            ]
        });

        render(
            <PropertyLocation property={propertyWithBusRoutes} isLoading={false} handleRefToContact={vi.fn()}/>
        );

        expect(screen.getByText('Bus Routes:')).toBeInTheDocument();
        expect(screen.getByText('Route 1')).toHaveAttribute('href', 'https://example.com/route1');
        expect(screen.getByText('Route 2')).toHaveAttribute('href', 'https://example.com/route2');
    });

    it('omits bus routes section when there are none', () => {
        render(
            <PropertyLocation property={property({busRoutes: []})} isLoading={false} handleRefToContact={vi.fn()}/>
        );

        expect(screen.queryByText('Bus Routes:')).not.toBeInTheDocument();
    });

    it('shows the off-site notice when the leasing office is off-site', () => {
        render(
            <PropertyLocation
                property={property({leasingOfficeType: LeasingOfficeType.OFF_SITE})}
                isLoading={false}
                handleRefToContact={vi.fn()}
            />
        );

        expect(screen.getByText('*There is NO ON-SITE Office')).toBeInTheDocument();
        expect(screen.getAllByText('(Off-site)').length).toBeGreaterThan(0);
    });

    it('does not show the off-site notice when the leasing office is on-site', () => {
        render(
            <PropertyLocation
                property={property({leasingOfficeType: LeasingOfficeType.ON_SITE})}
                isLoading={false}
                handleRefToContact={vi.fn()}
            />
        );

        expect(screen.queryByText('*There is NO ON-SITE Office')).not.toBeInTheDocument();
    });

    it('renders leasing office details, map images, and office image description when provided', () => {
        const propertyWithOffice = property({
            leasingOffice: {
                id: 'office1',
                name: 'HighGrove Leasing Office',
                address: '456 Office Rd',
                zipcode: '47403',
                phone: '3175559999',
                officeHours: 'Mon-Fri 9-5',
                direction: 'is located near campus',
                officeMap: 'https://example.com/office-map.jpg',
                officeMapLandscape: null,
                officeImage: 'https://example.com/office-image.jpg',
                officeImageDescription: 'Our friendly leasing office'
            }
        });

        render(
            <PropertyLocation property={propertyWithOffice} isLoading={false} handleRefToContact={vi.fn()}/>
        );

        expect(screen.getByText('456 Office Rd, 47403')).toHaveAttribute(
            'href',
            'https://www.mapquest.com/search/' + encodeURIComponent('456 Office Rd,47403')
        );
        expect(screen.getByText('(317)-555-9999')).toHaveAttribute('href', 'tel:3175559999');
        expect(screen.getByText('Mon-Fri 9-5')).toBeInTheDocument();
        expect(screen.getByText('HighGrove is located near campus')).toBeInTheDocument();
        expect(screen.getByText('Our friendly leasing office')).toBeInTheDocument();

        const images = screen.getAllByAltText('HighGrove Leasing Office');
        expect(images.length).toBe(2);
        expect(images[0]).toHaveAttribute('src', 'https://example.com/office-map.jpg');
        expect(images[1]).toHaveAttribute('src', 'https://example.com/office-image.jpg');
    });

    it('omits office map and office image when not provided', () => {
        const propertyWithOffice = property({
            leasingOffice: {
                id: 'office1',
                name: 'HighGrove Leasing Office',
                address: '456 Office Rd',
                zipcode: '47403',
                phone: '',
                officeHours: 'Mon-Fri 9-5',
                direction: 'is located near campus',
                officeMap: null,
                officeMapLandscape: null,
                officeImage: null,
                officeImageDescription: ''
            }
        });

        render(
            <PropertyLocation property={propertyWithOffice} isLoading={false} handleRefToContact={vi.fn()}/>
        );

        expect(screen.queryByAltText('HighGrove Leasing Office')).not.toBeInTheDocument();
    });
});
