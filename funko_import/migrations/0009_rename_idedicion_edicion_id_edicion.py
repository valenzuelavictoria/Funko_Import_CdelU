# Generated by Django 5.0.3 on 2025-02-15 20:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('funko_import', '0008_edicion'),
    ]

    operations = [
        migrations.RenameField(
            model_name='edicion',
            old_name='idEdicion',
            new_name='id_edicion',
        ),
    ]
