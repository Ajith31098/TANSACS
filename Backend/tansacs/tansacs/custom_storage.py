from storages.backends.s3boto3 import S3Boto3Storage

class StaticStorage(S3Boto3Storage):
    location = 'static'  # Set the location within the bucket for static files

class MediaStorage(S3Boto3Storage):
    location = 'media'  # Set the location within the bucket for media files